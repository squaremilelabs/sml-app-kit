import { Button, Input } from "@nextui-org/react"
import { useFormik } from "formik"
import usePortletSessionQuery from "~sml-app-kit/portlets/hooks/usePortletSessionQuery"
import { PortletSessionRecipientSchema } from "~sml-app-kit/portlets/schemas"
import { PortletComponentProps, PortletSessionRecipient } from "~sml-app-kit/portlets/types"

export default function RecipientForm({
  onAfterSave,
  ...portletContext
}: PortletComponentProps & { onAfterSave?: () => void }) {
  const { portletRegistry, portletId, sessionId } = portletContext
  const sessionQuery = usePortletSessionQuery({ portletRegistry, portletId, sessionId })
  const session = sessionQuery?.data

  const formik = useFormik<PortletSessionRecipient>({
    initialValues: session?.recipient ?? { name: "", email: "", phoneNumber: "" },
    enableReinitialize: true,
    validate: (values) => {
      const result = PortletSessionRecipientSchema.safeParse(values)
      if (result.error) {
        return Object.entries(result.error.formErrors.fieldErrors).reduce((obj, [key, value]) => {
          if (!value) return obj
          return { ...obj, [key]: value[0] }
        }, {})
      }
    },
    onSubmit: (values) => {
      console.log(values)
      if (onAfterSave) {
        onAfterSave()
      }
    },
  })

  return (
    <form onSubmit={formik.handleSubmit} className="grid grid-cols-2 gap-2 @container">
      <Input
        label="Name"
        {...formik.getFieldProps("name")}
        isRequired
        isInvalid={!!formik.touched.name && !!formik.errors.name}
        errorMessage={formik.touched.name ? formik.errors.name : null}
        classNames={{ base: "col-span-2" }}
      />
      <Input
        label="Email"
        type="email"
        {...formik.getFieldProps("email")}
        isRequired
        isInvalid={!!formik.touched.email && !!formik.errors.email}
        errorMessage={formik.touched.email ? formik.errors.email : null}
        classNames={{ base: "col-span-2 @wsm:col-span-1" }}
      />
      <Input
        label="Phone Number"
        type="tel"
        maxLength={14}
        startContent={<p className="text-sm text-default-400">+1</p>}
        {...formik.getFieldProps("phoneNumber")}
        isInvalid={!!formik.touched.phoneNumber && !!formik.errors.phoneNumber}
        errorMessage={formik.touched.phoneNumber ? formik.errors.phoneNumber : null}
        classNames={{ base: "col-span-2 @wsm:col-span-1" }}
      />
      <Button
        type="submit"
        className="col-span-2"
        color="primary"
        variant="ghost"
        isDisabled={!formik.isValid}
      >
        Save
      </Button>
    </form>
  )
}
