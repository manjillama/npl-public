import { withDashboard } from "../../hoc";

const HomePage = () => (
  <div className="container">
    <div className="body-card">
      <p>
        We at YATRI care deeply about the environment we live in and believe
        that clean individual mobility is an important piece in solving the
        problem of urban air pollution. We also believe that good design is
        critical in defining the public awareness of electric mobility since our
        goal is larger than catering solely to environmentalists. We aim to
        cater to the general public who may care more about owning a good
        product than about protecting the environment.
      </p>
      <br />
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
