import {PersonDto} from '../model/person.dto';
import {PersonPageForm} from './person-page.form';
import {CivilForm} from './civil/civil.form';
import {CoordForm} from './coord/coord.form';
import * as moment from 'moment';

export namespace PersonPageMappers {
  export function toForm(personDto: PersonDto): PersonPageForm {
    const civilForm: CivilForm = {
      dateNaissance: moment(personDto.birthdate, 'YYYY-MM-DD'),
      nom: personDto.lastName,
      prenom: personDto.firstname
    };
    const coordForm: CoordForm = {
      email: personDto.email,
      mobile: personDto.mobile,
      phone: personDto.phone
    };
    return {
      civilData: civilForm,
      coordData: coordForm
    } as PersonPageForm;
  }

  export function toDto(initialPersonDto: PersonDto, personPageForm: PersonPageForm): PersonDto {
    return null;
  }
}
