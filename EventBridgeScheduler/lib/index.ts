import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as scheduler from 'aws-cdk-lib/aws-scheduler';


export interface EventBridgeSchedulerProps {
  // Define construct properties here
  readonly schedulerProperties : scheduler.CfnScheduleProps
}

export class EventBridgeScheduler extends Construct {

  public readonly attr:scheduler.CfnSchedule

  constructor(scope: Construct, id: string, props: EventBridgeSchedulerProps) {
    super(scope, id);
    
    this.attr = new scheduler.CfnSchedule(this,'scheduleOne', props.schedulerProperties)
    
    const output:cdk.CfnOutputProps = {value:this.attr.attrArn,
      exportName:"schedulerArn",
      description:"shecduler One ARN"
    }
    new cdk.CfnOutput(this,"schedulerOutput",output)
  }

  
}
