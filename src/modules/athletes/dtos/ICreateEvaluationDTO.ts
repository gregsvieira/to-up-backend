export default interface ICreateEvaluationDTO {
  type: number;
  type_title: string;

  date: Date;
  athlete_age: number;
  athlete_weight: number;
  athlete_height: number;
  athlete_sexo: number;
  athlete_ethnicity: number;
  subscapular?: number;
  tricipital?: number;
  breastplate?: number;
  axilar?: number;
  thigh?: number;
  suprailiac?: number;
  abdominal?: number;
  chest?: number;
  waist?: number;
  leg?: number;
  hip?: number;
  right_arm?: number;
  left_arm?: number;
  abdomen?: number;
  right_thigh?: number;
  left_thigh?: number;
  right_leg?: number;
  left_leg?: number;
  observation?: string;
  left_forearm?: number;
  right_forearm?: number;

  total_skin_folds?: number;
  body_density?: number;
  fat_weight?: number;
  lean_body_mass?: number;
  mass_muscle?: number;
  body_muscle_percentage?: number;
  body_fat_percentage?: number;
  classification?: string;
  desired_fat_percentage?: number;
  ideal_body_weight?: string;

  athlete_id: string;
  trainer_id: string;
}
