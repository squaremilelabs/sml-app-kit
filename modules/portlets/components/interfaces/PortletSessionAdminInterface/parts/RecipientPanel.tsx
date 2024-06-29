"use client"
import { useMemo } from "react"
import { Button, Input } from "@nextui-org/react"
import { useFormik } from "formik"
import { PortletSessionUpdateSchema } from "@zenstackhq/runtime/zod/models"
import { z } from "zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import usePortletSessionQuery from "~sml-app-kit/modules/portlets/hooks/usePortletSessionQuery"
import setPortletSessionRecipient, {
  SetPortletSessionRecipientInput,
} from "~sml-app-kit/modules/portlets/functions/commands/setPortletSessionRecipient"
import convertEmptyStringsToNulls from "~sml-app-kit/helpers/convertEmptyStringsToNulls"
import Panel from "~sml-app-kit/smui/components/Panel"

const RecipientSchema = PortletSessionUpdateSchema.pick({
  recipientName: true,
  recipientEmail: true,
  recipientPhoneNumber: true,
})

export default function RecipientPanel({ portletSessionId }: { portletSessionId: string }) {
  const queryClient = useQueryClient()
  const portletSessionQuery = usePortletSessionQuery(portletSessionId)
  const portletSession = portletSessionQuery.data

  const formik = useFormik<z.infer<typeof RecipientSchema>>({
    initialValues: {
      recipientName: portletSession?.recipientName ?? "",
      recipientEmail: portletSession?.recipientEmail ?? "",
      recipientPhoneNumber: portletSession?.recipientPhoneNumber ?? "",
    },
    enableReinitialize: true,
    validate: (values) => {
      const result = RecipientSchema.safeParse(convertEmptyStringsToNulls(values))
      if (!result.success) {
        return Object.entries(result.error.formErrors.fieldErrors).reduce(
          (final, [key, value]) => ({ ...final, [key]: value[0] ?? undefined }),
          {}
        )
      }
    },
    onSubmit: (values) => {
      formSubmitMutation.mutate(values)
    },
  })

  const formSubmitMutation = useMutation({
    mutationKey: ["portletSession", portletSessionId, "setPortletSessionRecipient"],
    mutationFn: async (values: z.infer<typeof RecipientSchema>) => {
      const input = {
        portletSessionId,
        ...convertEmptyStringsToNulls(values),
      } as SetPortletSessionRecipientInput
      await setPortletSessionRecipient(input)
      await queryClient.invalidateQueries({ queryKey: ["portletSession", portletSessionId] })
    },
  })

  const isReadOnly = useMemo<boolean>(() => {
    if (!portletSession) return true
    if (portletSession.portlet.recipientSelectMethod !== "manual") return true
    if (portletSession.stage !== "draft") return true
    return false
  }, [portletSession])

  const subtitle = useMemo<string | undefined>(() => {
    if (!portletSession) return undefined
    if (
      portletSession.stage === "draft" &&
      portletSession.portlet.recipientSelectMethod === "state"
    ) {
      return "Recipient is set automatically"
    }
    return undefined
  }, [portletSession])

  return (
    <Panel
      as="form"
      title="Recipient"
      subtitle={subtitle}
      onSubmit={formik.handleSubmit}
      onReset={formik.handleReset}
      bottomContent={
        formik.dirty ? (
          <div className="flex items-center justify-stretch space-x-2">
            <Button type="reset" className="grow font-semibold" variant="flat">
              Reset
            </Button>
            <Button
              type="submit"
              className="shrink-0 grow font-semibold"
              color="primary"
              isDisabled={!formik.isValid}
              isLoading={formSubmitMutation.isPending}
            >
              Save
            </Button>
          </div>
        ) : null
      }
    >
      <div className="flex flex-col space-y-2">
        <Input
          label="Name"
          color={
            formik.initialValues.recipientName !== formik.values.recipientName
              ? "primary"
              : "default"
          }
          isInvalid={!!formik.touched.recipientName && !!formik.errors.recipientName}
          errorMessage={formik.touched.recipientName ? formik.errors.recipientName : null}
          isReadOnly={isReadOnly}
          {...formik.getFieldProps("recipientName")}
        />
        <div className="flex flex-col space-y-2 @wsm:flex-row @wsm:space-x-2 @wsm:space-y-0">
          <Input
            label="Email"
            color={
              formik.initialValues.recipientEmail !== formik.values.recipientEmail
                ? "primary"
                : "default"
            }
            isInvalid={!!formik.touched.recipientEmail && !!formik.errors.recipientEmail}
            errorMessage={formik.touched.recipientEmail ? formik.errors.recipientEmail : null}
            isReadOnly={isReadOnly}
            {...formik.getFieldProps("recipientEmail")}
          />
          <Input
            label="Phone Number"
            color={
              formik.initialValues.recipientPhoneNumber !== formik.values.recipientPhoneNumber
                ? "primary"
                : "default"
            }
            isInvalid={
              !!formik.touched.recipientPhoneNumber && !!formik.errors.recipientPhoneNumber
            }
            errorMessage={
              formik.touched.recipientPhoneNumber ? formik.errors.recipientPhoneNumber : null
            }
            isReadOnly={isReadOnly}
            {...formik.getFieldProps("recipientPhoneNumber")}
          />
        </div>
      </div>
    </Panel>
  )
}
