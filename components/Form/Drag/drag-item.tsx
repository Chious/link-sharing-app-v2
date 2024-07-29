import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Drag_icon from "@/public/images/icon-drag-and-drop.svg";
import { Dropdown } from "@/components/dropdown";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function SortableItem({
  data,
  index,
  delItem,
  setItemVal,
}: any) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: data.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    border: "1px solid transparent",
    padding: "1em",
    margin: "1em 0",
    width: "100%",
  };

  if (!data) {
    return null;
  }

  return (
    <div ref={setNodeRef} style={style} className="rounded-md bg-light-gray">
      <div className="flex justify-between">
        <div className="flex gap-4 items-center">
          <Button className="hover:bg-gray/20" {...listeners} {...attributes}>
            <Drag_icon />
          </Button>
          <h3>Link #{index + 1}</h3>
        </div>
        <Button
          onClick={() => {
            delItem(data.id);
          }}
        >
          Remove Link
        </Button>
      </div>
      <div className="space-y-2">
        <Label htmlFor="link-name">Platform</Label>
        <Dropdown
          value={data.platform}
          setItemVal={(v: string) => {
            setItemVal(data.id, v, "platform");
          }}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="link-url">Link URL</Label>
        <Input
          id="link-url"
          placeholder="Enter the URL of the link"
          value={data.url}
          onChange={(e) => setItemVal(data.id, e.target.value, "url")}
        />
      </div>
    </div>
  );
}
