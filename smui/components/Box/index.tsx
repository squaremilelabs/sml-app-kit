import React from "react"
import { ClassNameValue, twMerge } from "tailwind-merge"

export default function Box<As extends React.ElementType>({
  as,
  title,
  subtitle,
  topContent,
  topAsideContent,
  bottomContent,
  classNames,
  children,
  ...componentProps
}: {
  as?: As
  title?: string
  subtitle?: string
  topContent?: React.ReactNode
  topAsideContent?: React.ReactNode
  bottomContent?: React.ReactNode
  classNames?: {
    baseWrapper?: ClassNameValue
    topContentWrapper?: ClassNameValue
    mainContentWrapper?: ClassNameValue
    bottomContentWrapper?: ClassNameValue
  }
  children: React.ReactNode
} & React.ComponentPropsWithoutRef<As>) {
  const Component = as ?? "div"
  const showTopContent = !!topContent || !!title || !!subtitle || !!topAsideContent
  const showBottomContent = !!bottomContent
  return (
    <Component
      className={twMerge(
        "flex flex-col space-y-2 rounded bg-content2 p-1 @container",
        classNames?.baseWrapper
      )}
      {...componentProps}
    >
      {/* TOP CONTENT */}
      {showTopContent && (
        <div className={twMerge("px-2 pt-1", classNames?.topContentWrapper)}>
          {topContent ?? (
            <div className="flex items-center justify-between">
              <div>
                {title ? <p className="text-sm font-semibold">{title}</p> : null}
                {subtitle ? <p className="text-tiny text-default-500">{subtitle}</p> : null}
              </div>
              <div>{topAsideContent ?? null}</div>
            </div>
          )}
        </div>
      )}
      {/* MAIN CONTENT */}
      <div
        className={twMerge(
          "rounded bg-background p-4 shadow-small @container",
          classNames?.mainContentWrapper
        )}
      >
        {children}
      </div>
      {/* BOTTOM CONTENT */}
      {showBottomContent && (
        <div className={twMerge("pb-1", classNames?.bottomContentWrapper)}>{bottomContent}</div>
      )}
    </Component>
  )
}
