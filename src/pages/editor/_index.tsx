import { Layout } from "@/components/layout/_index"
import { SideEditor } from "./component/side-editor/_index"
import { RoomEditor } from "./component/room-editor/_index"

export default function Editor() {
  return (
    <Layout>
      <div className="grid grid-cols-12" aria-label="editor-container">
        <SideEditor />
        <RoomEditor />
      </div>
    </Layout>
  )
}