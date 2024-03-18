import * as cdk from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";
import { EventBridgeScheduler } from "../lib/index";

test("EventBridge Schedule Created", () => {
  const app = new cdk.App();
  const stack = new cdk.Stack(app, "TestStack");

  new EventBridgeScheduler(stack, "MyTestConstruct", {
    deadLetterQueue: { arn: "arn:aws:sqs:us-east1:queue/dead-letter-queue" },
    executionRole: "arn:aws:iam::role/execution-role",
    expression: "rate(1 hour)",
    name: "test-schedule",
    targetInput: `{DBInstance:"test-rds-instance"}`,
    targetApiCall: "rds:startInstance",
  });

  const template = Template.fromStack(stack);

  template.hasResourceProperties("AWS::Scheduler::Schedule", {
    Name: "test-schedule",
  });
});
