import TaskSorter from "../tasks-page-components/task-sorter";

interface StickyHeaderProps {
  title: string;
  counter: number;
  sorter?: JSX.Element;
}

function StickyHeader({ title, counter, sorter }: StickyHeaderProps) {
  return (
    <div className="position-sticky sticky-top bg-light py-3">
      <div className="d-flex justify-content-around align-items-center">
        <h6 className="text-center my-0">
          {title} ({counter})
        </h6>
        {(sorter !== undefined || sorter !== null) && sorter}
      </div>

      <hr className="my-0 mx-auto" />
    </div>
  );
}

export default StickyHeader;
