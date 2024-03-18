import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as scheduler from "aws-cdk-lib/aws-scheduler";

export interface EventBridgeSchedulerProps {
  readonly name: string;
  readonly deadLetterQueue: scheduler.CfnSchedule.DeadLetterConfigProperty;
  readonly executionRole: string;
  readonly kmsKey?: string;
  readonly expression: string;
  readonly flexibleWindow?: number;
  readonly endDate?: string;
  readonly timeZone?: string;
  readonly startDate?: string;
  readonly state?: string;
  readonly scheduleGroup?: string;
  readonly targetRetry?: scheduler.CfnSchedule.RetryPolicyProperty;
  readonly targetApiCall?: string;
  readonly targetResourceArn?: string;
  readonly targetInput: string;
  readonly targetResourceParameters?: any;
}

export class EventBridgeScheduler extends Construct {
  public readonly attr: scheduler.CfnSchedule;
  window: scheduler.CfnSchedule.FlexibleTimeWindowProperty = { mode: "OFF" };
  target: scheduler.CfnSchedule.TargetProperty;
  schedulerProperties: scheduler.CfnScheduleProps;

  constructor(scope: Construct, id: string, props: EventBridgeSchedulerProps) {
    super(scope, id);

    if (props.flexibleWindow) {
      this.window = {
        mode: "FLEXIBLE",
        maximumWindowInMinutes: props.flexibleWindow,
      };
    }

    if (props.targetApiCall && props.targetResourceArn) {
      throw new Error(
        "Only one targetApiCall or targetResourceArn variable can be set"
      );
    }

    if (props.targetApiCall) {
      this.target = {
        arn: `arn:aws:scheduler:::aws-sdk:targetApiCall`,
        roleArn: props.executionRole,
        input: props.targetInput,
        retryPolicy: props.targetRetry ? props.targetRetry : undefined,
        deadLetterConfig: props.deadLetterQueue
          ? props.deadLetterQueue
          : undefined,
      };
    }

    if (props.targetResourceArn) {
      const service: string = props.targetResourceArn.split(":")[2];
      this.target = {
        arn: props.targetResourceArn,
        roleArn: props.executionRole,
        input: props.targetInput,
        retryPolicy: props.targetRetry ? props.targetRetry : undefined,
        deadLetterConfig: props.deadLetterQueue
          ? props.deadLetterQueue
          : undefined,
        ecsParameters:
          service === "ecs" ? props.targetResourceParameters : undefined,
        eventBridgeParameters:
          service === "events" ? props.targetResourceParameters : undefined,
        kinesisParameters:
          service === "kinesis" ? props.targetResourceParameters : undefined,
        sageMakerPipelineParameters:
          service === "sagemaker" ? props.targetResourceParameters : undefined,
        sqsParameters:
          service === "sqs" ? props.targetResourceParameters : undefined,
      };
    }

    const schedulerProperties: scheduler.CfnScheduleProps = {
      name: props.name,
      flexibleTimeWindow: this.window,
      target: this.target,
      scheduleExpression: props.expression,
      endDate: props.endDate ? props.endDate : undefined,
      startDate: props.startDate ? props.startDate : undefined,
      groupName: props.scheduleGroup ? props.scheduleGroup : undefined,
      kmsKeyArn: props.kmsKey ? props.kmsKey : undefined,
      scheduleExpressionTimezone: props.timeZone ? props.timeZone : undefined,
      state: props.state ? props.state : "ENABLED",
    };

    this.attr = new scheduler.CfnSchedule(
      this,
      "scheduleOne-1",
      schedulerProperties
    );

    const output: cdk.CfnOutputProps = {
      value: this.attr.attrArn,
      exportName: "schedulerArn",
      description: "shecduler One ARN",
    };
    new cdk.CfnOutput(this, "schedulerOutput", output);
  }
}
