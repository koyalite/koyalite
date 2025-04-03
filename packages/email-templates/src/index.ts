import { render } from '@react-email/render';
import WelcomeEmail, { WelcomeEmailProps } from './templates/welcome';

export type EmailTemplate = 'welcome';

export type EmailTemplateProps = {
  welcome: WelcomeEmailProps;
};

export function renderTemplate<T extends EmailTemplate>(
  template: T,
  props: EmailTemplateProps[T]
): string {
  switch (template) {
    case 'welcome':
      return render(WelcomeEmail(props as WelcomeEmailProps));
    default:
      throw new Error(`Unknown email template: ${template}`);
  }
}

// Export templates and types
export { WelcomeEmail, type WelcomeEmailProps };

// Export default renderer
export default renderTemplate; 