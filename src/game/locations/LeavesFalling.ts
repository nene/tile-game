import { PixelScreen } from "../PixelScreen";
import { Particles } from "./Particles";
import { LeafParticle } from "./LeafParticle";
import { range } from "lodash";

const PARTICLE_COUNT = 50;

export class LeavesFalling implements Particles {
  private particles = range(1, PARTICLE_COUNT).map(() => new LeafParticle());

  tick() {
    this.particles.forEach((p) => p.tick());
  }

  paint(screen: PixelScreen) {
    screen.withFixedCoords(() => {
      screen.paint(this.particles);
    });
  }
}
