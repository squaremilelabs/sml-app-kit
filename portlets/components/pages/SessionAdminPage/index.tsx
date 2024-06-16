"use client"

import { useState } from "react"
import { PortletComponentProps } from "~sml-app-kit/portlets/types"
import Panel from "../../organisms/Panel"
import { Card, CardBody, Tab, Tabs } from "@nextui-org/react"

type ViewType = "panel" | "portlet"

export default function SessionAdminPage(props: PortletComponentProps) {
  const { portletRegistry, portletId } = props
  const [currentView, setCurrentView] = useState<ViewType>("panel")
  const portlet = portletRegistry.getPortlet(portletId)

  const Portlet = portlet?.PortletComponent ?? (() => null)

  return (
    <div className="h-full w-full @container">
      {/* DESKTOP */}
      <main className="hidden h-full w-full @wlg:flex">
        <section className="flex h-full w-1/2 shrink-0 flex-col items-center">
          <div className="h-full w-wmd max-w-full @container">
            <Panel {...props} />
          </div>
        </section>
        <section className="flex h-full w-1/2 shrink-0 flex-col items-center p-8">
          <Card className="h-full w-wsm max-w-full overflow-auto rounded-xl border-default-200 bg-background @container dark:border">
            <CardBody>
              <Portlet {...props} />
            </CardBody>
          </Card>
        </section>
      </main>
      {/* MOBILE */}
      <div className="flex h-full w-full flex-col items-center @wlg:hidden">
        <header className="w-wsm max-w-full shrink-0 p-4 pb-0">
          <nav>
            <Tabs
              selectedKey={currentView}
              onSelectionChange={(key) => setCurrentView(key as ViewType)}
              classNames={{ base: "w-full", tabList: "w-full" }}
            >
              <Tab key="panel" title="Panel" />
              <Tab key="portlet" title="Portlet" />
            </Tabs>
          </nav>
        </header>
        <main className="w-wsm max-w-full grow overflow-auto @container">
          {currentView === "panel" ? <Panel {...props} /> : null}
          {currentView === "portlet" ? <Portlet {...props} /> : null}
        </main>
      </div>
    </div>
  )
}
