(() => {
    'use strict';

    fdescribe('the Reporting component', () => {
        let $compile, $log, $q, ctrl, el, mock, networkService, scope;

        mock = {
            acbs: [
                {name: 'name1', retired: false},
                {name: 'name2', retired: true},
                {name: 'name3', retired: false},
            ],
            availableQuarters: [],
            quarters: [
                {acb: {name: 'name1'}, quarter: 'Q1', year: 2019, id: 1},
                {acb: {name: 'name3'}, quarter: 'Q1', year: 2019, id: 2},
                {acb: {name: 'name1'}, quarter: 'Q4', year: 2019, id: 3},
            ],
        };

        beforeEach(() => {
            angular.mock.module('chpl.surveillance', $provide => {
                $provide.decorator('networkService', $delegate => {
                    $delegate.createQuarterlySurveillanceReport = jasmine.createSpy('createQuarterlySurveillanceReport');
                    $delegate.deleteQuarterlySurveillanceReport = jasmine.createSpy('deleteQuarterlySurveillanceReport');
                    $delegate.getQuarterlySurveillanceReports = jasmine.createSpy('getQuarterlySurveillanceReports');
                    $delegate.updateQuarterlySurveillanceReport = jasmine.createSpy('updateQuarterlySurveillanceReport');

                    return $delegate;
                });
            });

            inject((_$compile_, _$log_, _$q_, $rootScope, _networkService_) => {
                $compile = _$compile_;
                $log = _$log_;
                $q = _$q_;
                networkService = _networkService_;
                networkService.createQuarterlySurveillanceReport.and.returnValue($q.when({}));
                networkService.deleteQuarterlySurveillanceReport.and.returnValue($q.when([]));
                networkService.getQuarterlySurveillanceReports.and.returnValue($q.when([]));
                networkService.updateQuarterlySurveillanceReport.and.returnValue($q.when({}));

                scope = $rootScope.$new();
                scope.acbs = mock.acbs;
                scope.availableQuarters = mock.availableQuarters;
                scope.quarters = mock.quarters;

                el = angular.element('<chpl-surveillance-reporting acbs="{acbs: acbs}" available-quarters="availableQuarters" quarters="quarters"></chpl-surveillance-reporting>');

                $compile(el)(scope);
                scope.$digest();
                ctrl = el.isolateScope().$ctrl;
            });
        });

        afterEach(() => {
            if ($log.debug.logs.length > 0) {
                /* eslint-disable no-console,angular/log */
                console.log('Debug:\n' + $log.debug.logs.map(o => angular.toJson(o)).join('\n'));
                /* eslint-enable no-console,angular/log */
            }
        });

        describe('view', () => {
            it('should be compiled', () => {
                expect(el.html()).not.toEqual(null);
            });
        });

        describe('controller', () => {
            it('should exist', () => {
                expect(ctrl).toEqual(jasmine.any(Object));
            });

            describe('during initiation', () => {
                it('should have constructed stuff', () => {
                    expect(ctrl.$log).toBeDefined();
                    expect(ctrl.hasAnyRole).toBeDefined();
                    expect(ctrl.networkService).toBeDefined();
                    expect(ctrl.mode).toBe('view');
                });

                it('should do things $onInit', () => {
                    expect(ctrl.availableYears).toBeDefined();
                    expect(ctrl.availableYears[0]).toBe(2019);
                });

                it('should do things $onChanges', () => {
                    expect(ctrl.acbs).toBeDefined();
                    expect(ctrl.acbs.length).toBe(2);
                    expect(ctrl.availableQuarters).toBeDefined();
                    expect(ctrl.quarters).toBeDefined();
                });

                it('should set visibility if only one acb', () => {
                    expect(ctrl.display).toBeUndefined();
                    let acbs = [
                        {name: 'name1', retired: false},
                    ];
                    ctrl.$onChanges({acbs: {currentValue: {acbs: acbs}}});
                    expect(ctrl.display).toEqual({name1: true});
                });
            });

            it('should find quarterly reports', () => {
                expect(ctrl.findQuarterReport({name: 'name1'}, 2019, 'Q1')).toEqual(mock.quarters[0]);
                expect(ctrl.findQuarterReport({name: 'name1'}, 2019, 'Q2')).toBeUndefined();
                expect(ctrl.findQuarterReport({name: 'name1'}, 2020, 'Q1')).toBeUndefined();
                expect(ctrl.findQuarterReport({name: 'name7'}, 2019, 'Q1')).toBeUndefined();
            });

            it('should allow viewing of a report', () => {
                ctrl.actOnQuarter({name: 'name1'}, 2019, 'Q1');
                expect(ctrl.activeQuarterReport).toEqual(mock.quarters[0]);
            });

            it('should close the report', () => {
                ctrl.actOnQuarter({name: 'name1'}, 2019, 'Q1');
                ctrl.actOnQuarter({name: 'name1'}, 2019, 'Q1');
                expect(ctrl.activeQuarterReport).toBeUndefined
            });

            it('should initiate a report', () => {
                ctrl.actOnQuarter({name: 'name1'}, 2019, 'Q5');
                expect(ctrl.activeQuarterReport).toEqual({
                    acb: {name: 'name1'},
                    year: 2019,
                    quarter: 'Q5',
                });
                expect(ctrl.mode).toBe('initiateQuarter');
            });

            describe('when handling callbacks', () => {
                let beforeReport;
                beforeEach(() => {
                    beforeReport = {id: 1};
                    ctrl.activeQuarterReport = beforeReport;
                });

                it('should handle edit', () => {
                    let report = {id: 'fake'};
                    ctrl.takeQuarterAction(report, 'edit');
                    expect(ctrl.activeQuarterReport).toBe(report);
                    expect(ctrl.mode).toBe('editQuarter');
                });

                it('should handle delete', () => {
                    ctrl.activeQuarterReport = beforeReport;
                    ctrl.mode = 'editQuarter';
                    spyOn(ctrl, 'cancelQuarter');
                    ctrl.takeQuarterAction(beforeReport, 'delete');
                    scope.$digest();
                    expect(networkService.deleteQuarterlySurveillanceReport).toHaveBeenCalledWith(beforeReport.id);
                    expect(networkService.getQuarterlySurveillanceReports).toHaveBeenCalled();
                    expect(ctrl.activeQuarterReport).toBeUndefined();
                    expect(ctrl.cancelQuarter).toHaveBeenCalled();
                });
            });

            describe('on save', () => {
                let report;
                beforeEach(() => {
                    report = {id: 1};
                });

                it('should handle edit', () => {
                    networkService.updateQuarterlySurveillanceReport.and.returnValue($q.when(report));
                    ctrl.activeQuarterReport = {};
                    ctrl.mode = 'editQuarter';
                    spyOn(ctrl, 'cancelQuarter');
                    ctrl.saveQuarter(report);
                    expect(ctrl.mode).toBe('view');
                    scope.$digest();
                    expect(networkService.updateQuarterlySurveillanceReport).toHaveBeenCalledWith(report);
                    expect(ctrl.activeQuarterReport).toBe(report);
                    expect(ctrl.cancelQuarter).toHaveBeenCalled();
                });

                it('should handle initiate', () => {
                    networkService.createQuarterlySurveillanceReport.and.returnValue($q.when(report));
                    ctrl.activeQuarterReport = {};
                    ctrl.mode = 'initiateQuarter';
                    spyOn(ctrl, 'cancelQuarter');
                    ctrl.saveQuarter(report);
                    expect(ctrl.mode).toBe('view');
                    scope.$digest();
                    expect(networkService.createQuarterlySurveillanceReport).toHaveBeenCalledWith(report);
                    expect(ctrl.activeQuarterReport).toBe(report);
                    expect(ctrl.cancelQuarter).toHaveBeenCalled();
                });
            });

            describe('on cancel', () => {
                it('should set the mode to view', () => {
                    ctrl.mode = 'fake';
                    ctrl.cancelQuarter();
                    expect(ctrl.mode).toBe('view');
                });

                it('should clear the initiating object', () => {
                    ctrl.mode = 'initiateQuarter';
                    ctrl.activeQuarterReport = 'fake';
                    ctrl.cancelQuarter();
                    expect(ctrl.activeQuarterReport).toBeUndefined();
                });
            });
        });
    });
})();
