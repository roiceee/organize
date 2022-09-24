interface StickyHeaderProps {
  title: string;
  counter: number;
}

function StickyHeader({ title, counter }: StickyHeaderProps) {
  return (
    <div className="position-sticky sticky-top bg-light py-3">
      <h6 className="text-center">
        {title} ({counter})
      </h6>
      <hr className="my-0 w-75 mx-auto" />
    </div>
  );
}

export default StickyHeader;
