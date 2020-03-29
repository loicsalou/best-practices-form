import {CivilForm} from './civil/civil.form';
import {CoordForm} from './coord/coord.form';

export interface PersonPageForm {
  civilData: CivilForm;
  coordData: CoordForm;
}
