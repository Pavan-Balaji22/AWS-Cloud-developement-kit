import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as scheduler from 'aws-cdk-lib/aws-scheduler';


export interface EventBridgeSchedulerProps {
  // Define construct properties here
  readonly schedulerProperties : scheduler.CfnScheduleProps;
  name: string;
  readonly deadLetterQueue:scheduler.CfnSchedule.DeadLetterConfigProperty;
  readonly executionRole:string;
  readonly kmsKey?: string; 
  readonly expression: string;
  readonly flexibleWindow:number;
  readonly endDate?:string;
  readonly timeZone?:string;
  readonly startDate?:string;
  readonly state?:string;
  readonly scheduleGroup?:string;
  readonly targetRetry:scheduler.CfnSchedule.RetryPolicyProperty
  readonly targetApiCall?: string;
  readonly targetResourceArn?:string;
  readonly targetInput:string;
  readonly targetResourceParameters?:scheduler.CfnSchedule.EcsParametersProperty | scheduler.CfnSchedule.KinesisParametersProperty| scheduler.CfnSchedule.EventBridgeParametersProperty | scheduler.CfnSchedule.SqsParametersProperty | scheduler.CfnSchedule.SageMakerPipelineParametersProperty;


}

export class EventBridgeScheduler extends Construct {

  public readonly attr:scheduler.CfnSchedule
  

  constructor(scope: Construct, id: string, props: EventBridgeSchedulerProps) {
    super(scope, id);
    var window:scheduler.CfnSchedule.FlexibleTimeWindowProperty = {mode:"OFF"};
    
    if (props.flexibleWindow) {
      window = {
        mode:"FLEXIBLE",
        maximumWindowInMinutes:props.flexibleWindow
    }}

    if(props.targetApiCall && props.targetResourceArn){
      throw new Error("Only one targetApiCall or targetResourceArn variable can be set");
      
    }

    if(props.targetApiCall){
      const target:scheduler.CfnSchedule.TargetProperty = {arn:`arn:aws:scheduler:::aws-sdk:targetApiCall`,
      roleArn:props.executionRole,
      input:props.targetInput,
      retryPolicy:props.targetRetry,
      deadLetterConfig:props.deadLetterQueue} 
    }

    const schedulerProperties:scheduler.CfnScheduleProps = {name:props.name,
    flexibleTimeWindow: window,
    target:,
    scheduleExpression:props.expression,

    }};
  
    this.attr = new scheduler.CfnSchedule(this,'scheduleOne-1', schedulerProperties)
    
    const output:cdk.CfnOutputProps = {value:this.attr.attrArn,
      exportName:"schedulerArn",
      description:"shecduler One ARN"
    }
    new cdk.CfnOutput(this,"schedulerOutput",output)
  }

  
}
