import noop from 'lodash/noop';
import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Formik, Form, Field, FieldProps, FormikProps } from 'formik';
import { ComboBox, Copyable, Input } from '@mycrypto/ui';

import { ContentPanel } from 'v2/components';
import './RequestAssets.scss';

// Legacy
import receiveIcon from 'common/assets/images/icn-receive.svg';

const initialValues = {
  recipientAddress: '0x80200997f095da94E404F7E0d581AAb1fFba9f7d',
  amount: '0.00',
  asset: 'ETH'
};

const truncate = (children: string) => {
  return [children.substring(0, 15), '…', children.substring(children.length - 10)].join('');
};

function RequestAssets({ history }: RouteComponentProps<{}>) {
  return (
    <div className="RequestAssets">
      <ContentPanel
        heading="Request Assets"
        icon={receiveIcon}
        onBack={history.goBack}
        className="RequestAssets-panel"
      >
        <Formik
          initialValues={initialValues}
          onSubmit={noop}
          render={({ values: { amount } }: FormikProps<typeof initialValues>) => (
            <Form>
              <fieldset className="RequestAssets-panel-fieldset">
                <label htmlFor="recipientAddress">Recipient Address</label>
                <Field
                  name="recipientAddress"
                  render={({ field }: FieldProps<typeof initialValues>) => (
                    <Input
                      {...field}
                      disabled={true}
                      className="RequestAssets-panel-fieldset-input"
                    />
                  )}
                />
              </fieldset>
              <div className="RequestAssets-panel-fieldset RequestAssets-panel-amountAsset">
                <div className="RequestAssets-panel-amountAsset-amount">
                  <label htmlFor="amount" className="RequestAssets-panel-amountAsset-amount-label">
                    Amount
                  </label>
                  <Field
                    name="amount"
                    render={({ field, form }: FieldProps<typeof initialValues>) => (
                      <Input
                        value={field.value}
                        onChange={({ target: { value } }) => form.setFieldValue(field.name, value)}
                        placeholder="0.00"
                        className="SendAssetsForm-fieldset-input"
                      />
                    )}
                  />
                </div>
                <div className="RequestAssets-panel-amountAsset-asset">
                  <label htmlFor="asset">Asset</label>
                  <Field
                    name="asset"
                    render={({ field }: FieldProps<typeof initialValues>) => (
                      <ComboBox
                        value={field.value}
                        items={new Set(['ETH', 'ZRX'])}
                        className="SendAssetsForm-fieldset-input"
                      />
                    )}
                  />
                </div>
              </div>
              {parseFloat(amount) > 0 && (
                <>
                  <div className="RequestAssets-panel-divider" />
                  <fieldset className="RequestAssets-panel-fieldset">
                    <label>Payment Code</label>
                    <div className="RequestAssets-panel-fieldset-box">
                      <Copyable
                        text="ethereum:0x80200997f095da94e404f7e0d581aab1ffba9f7d?value=2e18"
                        truncate={truncate}
                      />
                    </div>
                  </fieldset>
                  <fieldset className="RequestAssets-panel-fieldset">
                    <label>QR Code</label>
                    <div className="RequestAssets-panel-fieldset-box">(QR code goes here)</div>
                  </fieldset>
                </>
              )}
            </Form>
          )}
        />
      </ContentPanel>
    </div>
  );
}

export default withRouter(RequestAssets);