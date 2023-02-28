import type * as vscode from 'vscode'
import { event } from './api'

/**
 * Represents an interface for event emitters of network and account changes.
 */
export interface EventsInterface {
  /**
   * An event emitter for network changes.
   *
   * @event
   * @type {vscode.EventEmitter<string>}
   */
  network: vscode.EventEmitter<string>

  /**
   * An event emitter for account changes.
   *
   * @event
   * @type {vscode.EventEmitter<string>}
   */
  account: vscode.EventEmitter<string>
}

/**
 * Returns an object containing event emitters for network and account changes.
 *
 * @returns {EventsInterface} An object containing event emitters for network and account changes.
 *
 */
export function events (): EventsInterface {
  const network = event.network
  const account = event.account

  return {
    network,
    account
  }
}