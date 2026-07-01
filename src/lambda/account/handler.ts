import { Context, S3Event, APIGatewayProxyEvent } from "aws-lambda";
import { Logger } from '@aws-lambda-powertools/logger';
const logger = new Logger();

export const handler = async (event: S3Event, context: Context) => {
  logger.info(JSON.stringify(event));
  logger.info(JSON.stringify(context));

  return { 
    statusCode: 200,
    body: "account lambda"
  }
};
