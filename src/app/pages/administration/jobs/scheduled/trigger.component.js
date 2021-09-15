const JobsScheduledTriggerComponent = {
  templateUrl: 'chpl.administration/jobs/scheduled/trigger.html',
  bindings: {
    trigger: '<',
    acbs: '<',
    recurring: '<',
    onSave: '&',
    onCancel: '&',
    onDelete: '&',
  },
  controller: class JobsScheduledJobComponent {
    constructor($interval, $log) {
      'ngInject';

      this.$interval = $interval;
      this.$log = $log;
      this.selectedDateTime = new Date();
      this.parameters = [];
      this.handleDispatch = this.handleDispatch.bind(this);
    }

    $onInit() {
      const that = this;
      const tick = () => {
        that.now = Date.now();
      };
      tick();
      this.$interval(tick, 1000);
    }

    $onChanges(changes) {
      if (changes.trigger) {
        this.trigger = angular.copy(changes.trigger.currentValue);
      }
      if (changes.acbs) {
        this.acbs = angular.copy(changes.acbs.currentValue);
      }
      if (changes.recurring) {
        this.recurring = angular.copy(changes.recurring.currentValue);
      }
      if (this.trigger) {
        if (!this.trigger.cronSchedule) {
          this.trigger.cronSchedule = this.getDefaultCron();
        }
        if (this.trigger.acb) {
          this.selectedAcb = this.trigger.acb.split(',').map((acb) => ({ id: acb }));
        }
        if (this.trigger.job.jobDataMap.parameters) {
          this.parameters = JSON.parse(this.trigger.job.jobDataMap.parameters);
        }
      }
      if (this.acbs && !this.selectedAcb) {
        this.selectedAcb = this.acbs;
      }
    }

    handleDispatch(cron) {
      this.trigger.cronSchedule = cron;
    }

    save() {
      const toSave = {
        job: this.trigger.job,
      };
      if (this.recurring) {
        toSave.trigger = this.trigger;
        if (this.trigger.job.jobDataMap.acbSpecific) {
          toSave.trigger.acb = this.selectedAcb.map((acb) => acb.id).join(',');
        }
      } else {
        toSave.runDateMillis = this.selectedDateTime.getTime();
      }
      this.onSave({
        trigger: toSave,
      });
    }

    cancel() {
      this.onCancel();
    }

    delete() {
      this.onDelete({
        trigger: this.trigger,
      });
    }

    getDefaultCron() {
      let ret = '';
      if (this.trigger.job && this.trigger.job.frequency) {
        switch (this.trigger.job.frequency) {
          case 'MONTHLY':
          // first day of every month 4am UTC
            ret = '0 0 4 1 1/1 ? *';
            break;
          case 'WEEKLY':
          // every monday at 3am UTC
            ret = '0 0 3 ? * MON *';
            break;
          case 'HOURLY':
          // every hour at 30 minutes past the hour
            ret = '0 30 0/1 1/1 * ? *';
            break;
          default:
          // daily at 4am UTC
            ret = '0 0 4 1/1 * ? *';
            break;
        }
      }
      return ret;
    }
  },
};

angular.module('chpl.administration')
  .component('chplJobsScheduledTrigger', JobsScheduledTriggerComponent);

export default JobsScheduledTriggerComponent;
