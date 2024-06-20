"use client"

import { useMemo } from "react"
import { Button, Chip, Input } from "@nextui-org/react"
import { useFormik } from "formik"
import { PortletSessionUpdateSchema } from "@zenstackhq/runtime/zod/models"
import { z } from "zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import BoxContainer from "./BoxContainer"
import usePortletSessionQuery from "~sml-app-kit/portlets/hooks/usePortletSessionQuery"
import setPortletSessionRecipient, {
  SetPortletSessionRecipientInput,
} from "~sml-app-kit/portlets/functions/commands/setPortletSessionRecipient"
import convertEmptyStringsToNulls from "~sml-app-kit/form-helpers/convertEmptyStringsToNulls"

const RecipientSchema = PortletSessionUpdateSchema.pick({
  recipientName: true,
  recipientEmail: true,
  recipientPhoneNumber: true,
})

export default function RecipientBox({ portletSessionId }: { portletSessionId: string }) {
  const queryClient = useQueryClient()
  const portletSessionQuery = usePortletSessionQuery(portletSessionId)
  const portletSession = portletSessionQuery.data

  const display = useMemo<"form" | "waiting" | "info" | "loading" | "error">(() => {
    if (portletSessionQuery.isLoading) return "loading"
    if (portletSessionQuery.isError) return "error"
    if (portletSessionQuery.data) {
      const portletSession = portletSessionQuery.data
      if (portletSession.portlet.recipientSelectMethod === "manual") {
        if (portletSession.stage === "draft") return "form"
        return "info"
      } else {
        if (portletSession.stage === "draft") return "waiting"
        return "info"
      }
    }
    return "error"
  }, [portletSessionQuery.isLoading, portletSessionQuery.isError, portletSessionQuery.data])

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

  return (
    <BoxContainer title="Recipient" isLoading={display === "loading"} isError={display === "error"}>
      {display === "waiting" && <Chip>Recipient will be set automatically</Chip>}
      {display === "info" && (
        <div>
          <p>{portletSession?.recipientName}</p>
          <div className="flex items-center">
            <Chip>{portletSession?.recipientEmail}</Chip>
            {portletSession?.recipientPhoneNumber && (
              <Chip>{portletSession?.recipientPhoneNumber}</Chip>
            )}
          </div>
        </div>
      )}
      {display === "form" && (
        <form onSubmit={formik.handleSubmit} className="space-y-2">
          <Input
            label="Name"
            {...formik.getFieldProps("recipientName")}
            isInvalid={!!formik.touched.recipientName && !!formik.errors.recipientName}
            errorMessage={formik.touched.recipientName ? formik.errors.recipientName : null}
          />
          <Input
            label="Email"
            {...formik.getFieldProps("recipientEmail")}
            isInvalid={!!formik.touched.recipientEmail && !!formik.errors.recipientEmail}
            errorMessage={formik.touched.recipientEmail ? formik.errors.recipientEmail : null}
          />
          <Input
            label="Phone Number"
            {...formik.getFieldProps("recipientPhoneNumber")}
            isInvalid={
              !!formik.touched.recipientPhoneNumber && !!formik.errors.recipientPhoneNumber
            }
            errorMessage={
              formik.touched.recipientPhoneNumber ? formik.errors.recipientPhoneNumber : null
            }
          />
          <Button
            type="submit"
            isLoading={formSubmitMutation.isPending}
            isDisabled={!formik.dirty || !formik.isValid}
          >
            Save
          </Button>
        </form>
      )}
    </BoxContainer>
  )
}
