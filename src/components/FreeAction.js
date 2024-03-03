import Action from "@/components/Action";

export default function FreeAction({actions}) {
  return (
    <>
      {actions.map((action, index) => (
        <Action key={index} action={action} index={index} />
      ))}
    </>
  );
}