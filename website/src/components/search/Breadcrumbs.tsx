import routes from "@/lib/shared/routes";

interface Params {
  category: string;
  type?: string;
  item?: string;
}

export default function Breadcrumbs(params: Params) {
  return (
    <div className="flex gap-3 py-4 text-neutral-500">
      <a
        href={routes.category(params.category)}
        className="underline-offset-[3px] hover:underline hover:text-red-600 cursor-pointer">
        {params.category}
      </a>

      {params.type && (
        <>
          <span>{">"}</span>
          <span>{params.type}</span>
        </>
      )}

      {params.type && params.item && (
        <>
          <span>{">"}</span>
          <span className="font-medium text-dark">{params.item}</span>
        </>
      )}
    </div>
  );
}
