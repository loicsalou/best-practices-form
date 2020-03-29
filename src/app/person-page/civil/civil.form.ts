import {Moment} from 'moment';

export interface CivilForm {
  prenom: string;
  nom: string;
  dateNaissance: Moment; // Moment est utilisable dans le datepicker Material
}
