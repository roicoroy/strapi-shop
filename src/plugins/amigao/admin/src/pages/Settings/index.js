import React, {useMemo} from 'react';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import {useIntl} from 'react-intl';
import {Formik} from 'formik';
import {
  CheckPagePermissions,
  Form,
  GenericInput,
  LoadingIndicatorPage,
  SettingsPageTitle,
  useFocusWhenNavigate,
  useNotification,
  useOverlayBlocker,
  useRBAC,
} from '@strapi/helper-plugin';
import {useNotifyAT} from '@strapi/design-system/LiveRegions';
import {Main} from '@strapi/design-system/Main';
import {ContentLayout, HeaderLayout} from '@strapi/design-system/Layout';
import {Button} from '@strapi/design-system/Button';
import {Box} from '@strapi/design-system/Box';
import {Stack} from '@strapi/design-system/Stack';
import {Typography} from '@strapi/design-system/Typography';
import {Grid, GridItem} from '@strapi/design-system/Grid';
import Check from '@strapi/icons/Check';
import pluginPermissions from '../../permissions';
import {getTrad} from '../../utils';
import layout from './utils/layout';
import schema from './utils/schema';
import {fetchData, saveSettings} from './utils/api';

const ProtectedSettingsPage = () => (
  <CheckPagePermissions permissions={pluginPermissions.readSettings}>
    <SettingsPage />
  </CheckPagePermissions>
);

const SettingsPage = () => {
  const { formatMessage } = useIntl();
  const toggleNotification = useNotification();
  const { lockApp, unlockApp } = useOverlayBlocker();
  const { notifyStatus } = useNotifyAT();
  const queryClient = useQueryClient();
  useFocusWhenNavigate();

  const updatePermissions = useMemo(
    () => ({ update: pluginPermissions.updateSettings }),
    []
  );
  const {
    isLoading: isLoadingForPermissions,
    allowedActions: { canUpdate },
  } = useRBAC(updatePermissions);

  const { status: isLoadingData, data } = useQuery('advanced', () => fetchData(), {
    onSuccess: () => {
      notifyStatus(
        formatMessage({
          id: getTrad('Form.advancedSettings.data.loaded'),
          defaultMessage: 'The settings data has been loaded',
        })
      );
    },
    onError: () => {
      toggleNotification({
        type: 'warning',
        message: { id: getTrad('notification.error'), defaultMessage: 'An error occurred' },
      });
    },
  });

  const isLoading = isLoadingForPermissions || isLoadingData !== 'success';

  const submitMutation = useMutation(body => saveSettings(body), {
    onSuccess: async () => {
      await queryClient.invalidateQueries('settings');
      toggleNotification({
        type: 'success',
        message: { id: getTrad('notification.success.saved'), defaultMessage: 'Saved' },
      });

      unlockApp();
    },
    onError: () => {
      toggleNotification({
        type: 'warning',
        message: { id: getTrad('notification.error'), defaultMessage: 'An error occured' },
      });
      unlockApp();
    },
    refetchActive: true,
  });

  const { isLoading: isSubmittingForm } = submitMutation;

  const handleSubmit = async body => {
    lockApp();
    await submitMutation.mutateAsync(body);
  };

  if (isLoading) {
    return (
      <Main aria-busy="true">
        <SettingsPageTitle
          name={formatMessage({
            id: getTrad('Header.Settings'),
            defaultMessage: 'Passwordless Plugin',
          })}
        />
        <HeaderLayout
          title={formatMessage({
            id: getTrad('Header.Settings'),
            defaultMessage: 'Passwordless Plugin',
          })}
        />
        <ContentLayout>
          <LoadingIndicatorPage />
        </ContentLayout>
      </Main>
    );
  }
  return (
    <Main aria-busy={isSubmittingForm}>
      <SettingsPageTitle
        name={formatMessage({
          id: getTrad('Form.title.Settings'),
          defaultMessage: 'Configuration',
        })}
      />
      <HeaderLayout
        id="title"
        title={formatMessage({
          id: getTrad('Form.title.Settings'),
          defaultMessage: 'Configuration',
        })}
        subtitle={formatMessage({
          id: getTrad('Settings.enabled.description'),
          defaultMessage: 'Enables a secure and seamless emailed link authentication.',
        })}
      />
    </Main>
  );
};

export default ProtectedSettingsPage;
