import * as cdk from 'aws-cdk-lib/core';
import * as lambda from "aws-cdk-lib/aws-lambda";
import { Construct } from 'constructs';
import { LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
export class AppStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'AppQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
    
    const helloWorldLambda = new lambda.Function(this, 'MyFunction', {
      runtime: lambda.Runtime.NODEJS_LATEST,
      handler: 'index.handler',
      code: lambda.Code.fromInline(`
        exports.handler = async function(event) {
          return {
            statusCode: 200,
            body: JSON.stringify('Hello World!'),
          };
        };
      `)
    });

    const accountLambda = new NodejsFunction(this, "AccountLambda", {
      runtime: lambda.Runtime.NODEJS_LATEST,
      entry: "src/lambda/account/handler.ts",
    });

    const api = new RestApi(this, "StickerShopApi");
    const helloWorldLambdaIntegration = new LambdaIntegration(helloWorldLambda);
    const accountLambdaIntegration = new LambdaIntegration(accountLambda);

    api.root.addMethod('GET', helloWorldLambdaIntegration);
    api.root.addResource('account').addMethod('GET', accountLambdaIntegration);
  }
}
