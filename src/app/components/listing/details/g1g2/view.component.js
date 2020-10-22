export const G1G2ViewComponent = {
    templateUrl: 'chpl.components/listing/details/g1g2/view.html',
    bindings: {
        measures: '<',
    },
    controller: class G1G2ViewComponent {
        constructor ($log) {
            'ngInject';
            this.$log = $log;
        }

        $onChanges (changes) {
            if (changes.measures && changes.measures.currentValue) {
                this.measures = changes.measures.currentValue
                    .map(m => {
                        m.displayCriteria = m.associatedCriteria.map(c => c.number).join('; ');
                        return m;
                    })
                    .sort((a, b) => this.measureSort(a, b));
            }
        }

        measureSort (a, b) {
            return a.measurementType.name < b.measurementType.name ? -1 : a.measurementType.name > b.measurementType.name ? 1 :
                a.measure.name < b.measure.name ? -1 : a.measure.name > b.measure.name ? 1 :
                0;
        }
    },
};

angular
    .module('chpl.components')
    .component('chplG1g2View', G1G2ViewComponent);
