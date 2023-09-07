import { withDashboard } from "../../hoc";

const HomePage = () => (
  <div className="container">
    <div className="body-card">
      <p>
        <i>
          <strong>
            &quot;Many of life&apos;s failures are people who did not realize
            how close they were to success when they gave up.&quot;
          </strong>
        </i>
        - Thomas Edison
      </p>
    </div>
  </div>
);

export default withDashboard(HomePage);
