/**
 * Logger utility class for test automation
 * Provides structured logging with timestamps and log levels
 */
export class Logger {
  private context: string;
  private enableTimestamp: boolean;

  constructor(context: string = 'Test', enableTimestamp: boolean = true) {
    this.context = context;
    this.enableTimestamp = enableTimestamp;
  }

  /**
   * Get formatted timestamp
   */
  private getTimestamp(): string {
    if (!this.enableTimestamp) return '';
    const now = new Date();
    return `[${now.toISOString()}]`;
  }

  /**
   * Format log message with timestamp and context
   */
  private formatMessage(level: string, message: string): string {
    const timestamp = this.getTimestamp();
    return `${timestamp} [${level}] [${this.context}] ${message}`;
  }

  /**
   * Log info level message
   */
  info(message: string): void {
    console.log(this.formatMessage('INFO', message));
  }

  /**
   * Log debug level message
   */
  debug(message: string): void {
    console.log(this.formatMessage('DEBUG', message));
  }

  /**
   * Log warning level message
   */
  warn(message: string): void {
    console.warn(this.formatMessage('WARN', message));
  }

  /**
   * Log error level message
   */
  error(message: string, error?: Error): void {
    console.error(this.formatMessage('ERROR', message));
    if (error) {
      console.error(`Stack trace: ${error.stack}`);
    }
  }

  /**
   * Log step in test execution
   */
  step(stepNumber: number, description: string): void {
    console.log(this.formatMessage('STEP', `${stepNumber}. ${description}`));
  }

  /**
   * Log test start
   */
  testStart(testName: string): void {
    console.log('\n' + '='.repeat(80));
    console.log(this.formatMessage('START', `Test: ${testName}`));
    console.log('='.repeat(80));
  }

  /**
   * Log test end
   */
  testEnd(testName: string, status: 'PASSED' | 'FAILED' = 'PASSED'): void {
    console.log('='.repeat(80));
    console.log(this.formatMessage('END', `Test: ${testName} - ${status}`));
    console.log('='.repeat(80) + '\n');
  }

  /**
   * Update context for the logger
   */
  setContext(context: string): void {
    this.context = context;
  }
}
