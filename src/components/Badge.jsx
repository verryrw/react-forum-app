// eslint-disable-next-line react/prop-types
export default function Badge({ children, variant }) {
  if (variant == "outline") {
    return (
      <span className="inline-block border border-[#fd7014] whitespace-nowrap rounded-md px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-zinc-600 dark:text-neutral-100">
        {children}
      </span>
    );
  }

  return (
    <span className="inline-block whitespace-nowrap rounded-md bg-[#fd7014] px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-zinc-600 dark:[#fd7014] dark:text-neutral-100">
      {children}
    </span>
  );
}
