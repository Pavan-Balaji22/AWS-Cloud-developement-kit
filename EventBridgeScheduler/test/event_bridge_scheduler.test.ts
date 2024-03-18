import * as cdk from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";
import { EventBridgeScheduler } from "../lib/index";

test("EventBridge Schedule Created", () => {
  const app = new cdk.App();
  const stack = new cdk.Stack(app, "TestStack");

  new EventBridgeScheduler(stack, "MyTestConstruct", {
    deadLetterQueue: { arn: "dsads" },
    executionRole: "wdawsdds",
    expression: "dsadsada",
    name: "dasdasdasd",
    targetInput: "dasdada",
  });

  const template = Template.fromStack(stack);

  template.hasResourceProperties("AWS::Scheduler::Schedule", {
    Name: "test-schedule",
  });
});
