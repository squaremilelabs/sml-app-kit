import { Button, ButtonGroup, Skeleton } from "@nextui-org/react"
import { UseMutationResult } from "@tanstack/react-query"
import { FormikProps } from "formik"
import React from "react"
import { twMerge } from "tailwind-merge"

export default function FormBox<FT, MT>({
  title,
  description,
  formik,
  submitMutation,
  hideActions = false,
  showLoadingSkeleton,
  customActionsContent,
  resetLabel = "Reset",
  saveLabel = "Save",
  customBottomContent,
  children,
}: {
  title: string
  description?: string
  formik: FormikProps<FT>
  submitMutation: UseMutationResult<void, Error, MT, unknown>
  showLoadingSkeleton?: boolean
  hideActions?: boolean
  customActionsContent?: React.ReactNode
  disableResetAction?: boolean
  resetLabel?: string
  saveLabel?: string
  customBottomContent?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <form
      onSubmit={formik.handleSubmit}
      onReset={formik.handleReset}
      className={twMerge("group flex flex-col space-y-2 rounded bg-content2 p-1 @container")}
    >
      <div className="flex items-center justify-between pt-1">
        {/* TITLE & DESCRIPTION */}
        <div className="px-2">
          <p className="text-sm font-semibold">{title}</p>
          {description ? <p className="text-tiny text-default-500">{description}</p> : null}
        </div>
        {/* FORM ACTIONS */}
        <div className="h-8">
          {hideActions
            ? null
            : customActionsContent ?? (
                <ButtonGroup
                  className={twMerge(
                    formik.dirty ? "visible" : "invisible group-focus-within:visible"
                  )}
                  size="sm"
                >
                  <Button
                    size="sm"
                    color="primary"
                    variant="bordered"
                    type="reset"
                    className="font-semibold"
                    isDisabled={!formik.dirty}
                  >
                    {resetLabel}
                  </Button>
                  <Button
                    size="sm"
                    color="primary"
                    isDisabled={!formik.isValid || !formik.dirty}
                    type="submit"
                    isLoading={submitMutation.isPending}
                    className="font-semibold"
                  >
                    {saveLabel}
                  </Button>
                </ButtonGroup>
              )}
        </div>
      </div>
      {/* FORM BODY */}
      <div className="rounded bg-background p-4 shadow-small @container">
        {showLoadingSkeleton ? (
          <div className="flex w-full flex-col space-y-2">
            <Skeleton className="h-10 w-full rounded" />
            <Skeleton className="h-10 w-1/2 rounded" />
            <Skeleton className="h-10 w-1/4 rounded" />
          </div>
        ) : (
          children
        )}
      </div>
      {/* BOTTOM CONTENT */}
      {customBottomContent ?? null}
    </form>
  )
}
