import { useTranslations as useNextIntlTranslations } from 'next-intl';

export function useTranslations(namespace?: string) {
  return useNextIntlTranslations(namespace);
}

// Type-safe translation keys
export type TranslationKey =
  | 'common.loading'
  | 'common.error'
  | 'common.success'
  | 'common.warning'
  | 'common.info'
  | 'common.confirm'
  | 'common.cancel'
  | 'common.save'
  | 'common.edit'
  | 'common.delete'
  | 'common.search'
  | 'common.submit'
  | 'common.reset'
  | 'auth.signIn'
  | 'auth.signOut'
  | 'auth.signUp'
  | 'auth.email'
  | 'auth.password'
  | 'auth.forgotPassword'
  | 'auth.rememberMe'
  | 'auth.or'
  | 'auth.continueWith'
  | 'auth.dontHaveAccount'
  | 'auth.alreadyHaveAccount'
  | 'auth.errors.invalidCredentials'
  | 'auth.errors.emailRequired'
  | 'auth.errors.passwordRequired'
  | 'auth.errors.emailInvalid'
  | 'errors.somethingWentWrong'
  | 'errors.pageNotFound'
  | 'errors.unauthorized'
  | 'errors.forbidden'
  | 'errors.serverError'
  | 'errors.networkError'
  | 'errors.tryAgain'
  | 'navigation.home'
  | 'navigation.dashboard'
  | 'navigation.profile'
  | 'navigation.settings'
  | 'navigation.help'
  | 'navigation.about';
