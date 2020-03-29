import {ValidatorFn} from '@angular/forms';

export namespace FormUtils {

  export type FormValidators<T> = {
    [F in keyof T]?: null | ValidatorFn | ValidatorFn[]
  };

  /**
   * Construit la liste de FormControls déclarés par la formdef de type T en injectant dans chaque contrôle la valeur
   * contenue dans le formDef et les validateurs associés au contrôle.
   * @param formDef définition de la structure de la forme et des valeurs initiales souhaitées
   * @param formValidators un objet de même structure que le formDEf précisant pour chaque champ les validateurs.
   * Optionnel
   */
  export function mergeFieldsAndValidators<T>(fields: T, validators: FormValidators<T>): any {
    const ret = Object.keys(fields).reduce(
      (reduced, key) => {
        const controlConf = [fields[ key ]];
        if (validators[ key ]) {
          controlConf.push(validators[ key ]);
        }
        reduced[ key ] = controlConf;
        return reduced;
      }, {});
    return ret;

  }

}
