import { ScrollShadow } from "@nextui-org/react"
import { twMerge } from "tailwind-merge"
import { PortletComponentProps } from "~sml-app-kit/portlets/types"
import RecipientBox from "../../molecules/RecipientBox"
import PanelBox from "../../atoms/PanelBox"
import SendActionsButton from "../../molecules/SendActionsButton"

export default function Panel(props: PortletComponentProps) {
  const { portletRegistry, portletId } = props
  const portlet = portletRegistry.getPortlet(portletId)

  const panelTitle = "Send Portlet"

  const PortletControl = portlet?.PortletControlComponent ?? (() => null)

  return (
    <div className="flex h-full w-full flex-col items-stretch transition-all @container">
      <header
        className={twMerge(
          "sticky top-0 z-50 shrink-0 bg-background/30 p-4 pb-0 backdrop-blur-md transition-all @wsm:p-8 @wsm:pb-0",
          "flex flex-col space-y-1"
        )}
      >
        <h1 className="text-2xl font-bold">{panelTitle}</h1>
        <p className="font-semibold text-primary">{portlet?.title}</p>
      </header>
      <ScrollShadow
        as="main"
        className="flex grow flex-col space-y-4 p-4 transition-all @wsm:px-8 @wsm:py-4"
      >
        <PanelBox title="Context">
          <PortletControl {...props} />
        </PanelBox>
        <RecipientBox {...props} />
      </ScrollShadow>
      <footer
        className={twMerge(
          "sticky bottom-0 z-50 shrink-0 bg-background/30 p-4 pt-0 backdrop-blur-md transition-all @wsm:p-8 @wsm:pt-0",
          "flex w-full items-center justify-stretch"
        )}
      >
        <SendActionsButton {...props} variant="solid" />
      </footer>
    </div>
  )
}
