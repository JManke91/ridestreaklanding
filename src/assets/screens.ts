import type { ImageMetadata } from 'astro';
import type { ScreenKey } from '../i18n/types';

import statisticsBasic from './screens/statistics-basic.png';
import statisticsPrs from './screens/statistics-prs.png';
import workoutDetailsBasic from './screens/workout-details-basic.png';
import workoutDetailsVelocity from './screens/workout-details-velocity.png';
import workoutDetailsHeartrate from './screens/workout-details-heartrate.png';
import workoutDetailsMore from './screens/workout-details-more.png';
import garage from './screens/garage.png';
import tour from './screens/tour.png';
import shareWorkout from './screens/share-workout.png';
import flyoverFeature from './screens/3d-flyover-feature.png';
import flyoverMap from './screens/3d-flyover-map.png';

/**
 * The single place screenshots are resolved. Copy files reference a
 * `ScreenKey`; only this map knows about files on disk, so replacing a
 * screenshot is a one-line change here.
 *
 * ⚠️ These captures are all German UI. They are served on the English page as
 * well because no English set exists yet (brief §8.1 asks for one per locale).
 */
export const SCREENS: Record<ScreenKey, ImageMetadata> = {
  'statistics-basic': statisticsBasic,
  'statistics-prs': statisticsPrs,
  'workout-details-basic': workoutDetailsBasic,
  'workout-details-velocity': workoutDetailsVelocity,
  'workout-details-heartrate': workoutDetailsHeartrate,
  'workout-details-more': workoutDetailsMore,
  garage: garage,
  tour: tour,
  'share-workout': shareWorkout,
  '3d-flyover-feature': flyoverFeature,
  '3d-flyover-map': flyoverMap,
};
