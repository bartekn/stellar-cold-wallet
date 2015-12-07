import React from 'react';
import _ from 'lodash'

import {Badge} from 'material-ui';
import {FlatButton} from 'material-ui';
import {TextField} from 'material-ui';
import {Toggle} from 'material-ui';

import {TransactionQrDialog} from './TransactionQrDialog';
import {Account, Asset, Network, Operation, Keypair, TransactionBuilder} from 'stellar-base';

export let Form = React.createClass({
  getInitialState: function() {
    return {
      qrOpen: false,
      transaction: null,
      liveNetwork: false,
      errors: {}
    };
  },
  closeQr: function() {
    this.setState(_.extend(this.state, {qrOpen: false}));
  },
  submit: function() {
    // Validate
    let errors = {};
    let keypair;
    try {
      keypair = Keypair.fromSeed(this.state.secretSeed);
    } catch (e) {
      errors.secretSeed = "Invalid secret seed.";
    }

    if (!Account.isValidAddress(this.state.destination)) {
      errors.destination = "Invalid destination.";
    }

    if (!/^[0-9]+$/.test(this.state.sequenceNumber)) {
      errors.sequenceNumber = "Invalid amount.";
    }

    if (!Operation.isValidAmount(this.state.amount)) {
      errors.amount = "Invalid amount.";
    }

    if (!_.isEmpty(errors)) {
      this.setState(_.extend(this.state, {errors}));
      return;
    }

    if (this.state.liveNetwork) {
      Network.usePublicNetwork();
    } else {
      Network.useTestNetwork();
    }

    let account = new Account(keypair.address(), this.state.sequenceNumber);
    let transaction = new TransactionBuilder(account)
      .addOperation(Operation.payment({
        asset: Asset.native(),
        amount: this.state.amount,
        destination: this.state.destination,
      }))
      .build();
    transaction.sign(keypair);

    this.setState(_.extend(this.state, {qrOpen: true, transaction}));
  },
  _handleInputChange: function(key, event) {
    let state = _.cloneDeep(this.state);
    state[key] = event.target.value;
    delete state.errors[key];
    this.setState(state);
  },
  _setLiveNetwork: function(event, liveNetwork) {
    this.setState(_.extend(this.state, {liveNetwork}));
  },
  render: function() {
    let buttonPrimary = false, buttonSecondary = true;
    if (this.state.liveNetwork) {
      buttonPrimary = true;
      buttonSecondary = false;
    }

    return <div id="form">
      <div>
        <Toggle
          name="liveNetwork"
          value="true"
          defaultToggled={this.state.liveNetwork}
          onToggle={this._setLiveNetwork}
          label="Live Network"
          labelStyle={{fontSize: "13px", color: "rgb(0, 188, 212)", width: "200px"}} />
      </div>
      <div>
        <TextField
          onChange={this._handleInputChange.bind(this, 'secretSeed')}
          hintText="Your account secret seed (starts with S)"
          floatingLabelText="Secret Seed"
          fullWidth={true}
          errorText={this.state.errors.secretSeed}
          type="password" />
      </div>
      <div>
        <TextField
          onChange={this._handleInputChange.bind(this, 'sequenceNumber')}
          hintText="Your account sequence number can be found using Horizon API"
          floatingLabelText="Sequence Number"
          errorText={this.state.errors.sequenceNumber}
          fullWidth={true} />
      </div>
      <div>
        <TextField
          onChange={this._handleInputChange.bind(this, 'destination')}
          hintText="Account ID of the payment receiver (starts with G)"
          floatingLabelText="Destination Account ID"
          errorText={this.state.errors.destination}
          fullWidth={true} />
      </div>
      <div>
        <TextField
          onChange={this._handleInputChange.bind(this, 'amount')}
          hintText="Amount of lumens to send"
          floatingLabelText="Amount (XLM)"
          errorText={this.state.errors.amount}
          fullWidth={true} />
      </div>
      <div className="button-row">
        {this.state.liveNetwork ? <div>Live network transaction!!!</div> : null}
        <FlatButton label="Show transaction"
            primary={buttonPrimary}
            secondary={buttonSecondary}
            onTouchTap={this.submit} />
      </div>
      <TransactionQrDialog open={this.state.qrOpen}
        transaction={this.state.transaction}
        onClose={this.closeQr} />
    </div>;
  }
});
