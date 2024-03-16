import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { EventBridgeScheduler } from '../lib/index';

test('EventBridge Schedule Created', () => {
    const app = new cdk.App();
    const stack = new cdk.Stack(app, "TestStack");

new EventBridgeScheduler(stack, 'MyTestConstruct',{schedulerProperties:{
        name:"test-schedule",
        flexibleTimeWindow:{mode:"OFF"},
        scheduleExpression: "rate(1 hour)",
        target:{input:'{data:"test"}',
            arn:"rds:StartDbInstance",
            roleArn:"role"
            }
}});

const template = Template.fromStack(stack);



  template.hasResourceProperties('AWS::Scheduler::Schedule',{
        Name:"test-schedule"
});
});
