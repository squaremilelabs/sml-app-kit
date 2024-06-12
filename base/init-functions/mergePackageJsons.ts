import * as fs from "fs"
import * as path from "path"
import { merge } from "ts-deepmerge"

export default function mergePackageJsons(output: string, paths: string[]) {
  const packageJsonObjects = paths.map((packageJsonPath) => {
    const jsonString = fs.readFileSync(packageJsonPath, "utf-8")
    const jsonObject = JSON.parse(jsonString)
    return jsonObject
  })
  const merged = merge(...packageJsonObjects)
  fs.writeFileSync(path.resolve(process.cwd(), output), JSON.stringify(merged, null, 2))
}
