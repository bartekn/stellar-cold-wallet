import React from 'react';

import {Dialog} from 'material-ui';
import QRCode from 'qrcode.react';

export let TransactionQrDialog = React.createClass({
  getInitialState: function() {
    return {};
  },
  render: function() {
    let dialogActions = [
      {
        text: "Close",
        onTouchTap: this.props.onClose
      }
    ];

    let transactionBlob = "";
    if (this.props.transaction && this.props.transaction.toEnvelope) {
      transactionBlob = this.props.transaction.toEnvelope().toXDR().toString("base64");
    }

    return <Dialog title="Transaction QR code"
      open={this.props.open}
      actions={dialogActions}>
      Check this transaction in XDR Viewer before submitting it to the network!<br />
      <QRCode
        value={transactionBlob}
        size={350} />
    </Dialog>;
  }
});
