// import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as scheduler from 'aws-cdk-lib/aws-scheduler';


export interface EventBridgeSchedulerProps {
  // Define construct properties here
  schedulerProperties : scheduler.CfnScheduleProps
}

export class EventBridgeScheduler extends Construct {

  constructor(scope: Construct, id: string, props: EventBridgeSchedulerProps) {
    super(scope, id);
    
    const schedule1 = new scheduler.CfnSchedule(this,'scheduleOne', props.schedulerProperties)
  }
}
