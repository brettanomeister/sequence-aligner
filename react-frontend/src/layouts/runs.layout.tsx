import InProgressRuns from "../components/in-progress-runs.component";
import SuccessfulAlignments from "../components/successful-alignments.component";

function RunsPage() {
  return (
    <div>
      <InProgressRuns />
      <br/>
      <SuccessfulAlignments />
    </div>
  );
}

export default RunsPage;