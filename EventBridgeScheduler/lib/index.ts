import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as scheduler from 'aws-cdk-lib/aws-scheduler';


export interface EventBridgeSchedulerProps {
  // Define construct properties here
  schedulerProperties : scheduler.CfnScheduleProps
}

export class EventBridgeScheduler extends Construct {

  public readonly schedule:scheduler.CfnSchedule
  public readonly output:cdk.CfnOutput

  constructor(scope: Construct, id: string, props: EventBridgeSchedulerProps) {
    super(scope, id);
    
    this.schedule = new scheduler.CfnSchedule(this,'scheduleOne', props.schedulerProperties)
    
    const output:cdk.CfnOutputProps = {value:this.schedule.attrArn,
      exportName:"schedulerOneArn",
      description:"shecduler One ARN",
      key:"resourceArn"  
    }
    this.output = new cdk.CfnOutput(this,"schedulerOutput",output)
  }

  
}
