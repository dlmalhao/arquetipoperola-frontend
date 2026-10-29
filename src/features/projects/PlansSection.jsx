import Grid from '@mui/material/Grid';
import './project_detail.css';

export default function PlansSection({ plans }) {
  if (!plans?.length) return null;

  return (
    <section className="project-detail__section project-detail__plans" data-aos="fade-in" data-aos-duration="2000" data-aos-delay="100">
      <h3>Plantas</h3>
      <Grid container spacing={2}>
        {plans.map((plan) => (
          <Grid item size={{ xs: 12, sm: 6, md: 3 }} key={plan.url}>
            <a className="project-detail__plan" href={plan.url} target="_blank" rel="noreferrer">
              {plan.name}
            </a>
          </Grid>
        ))}
      </Grid>
    </section>
  );
}
