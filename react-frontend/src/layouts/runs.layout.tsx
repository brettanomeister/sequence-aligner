import InProgressRuns from "../components/in-progress-runs.component";
import SuccessfulAlignments from "../components/successful-alignments.component";

function RunsPage() {
  return (
    <div>
      <br/>
      <InProgressRuns />
      <br/>
      <SuccessfulAlignments />
    </div>
  );
}

export default RunsPage;