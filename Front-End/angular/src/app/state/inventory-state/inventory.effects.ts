import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { mergeMap, map, catchError, switchMap } from 'rxjs/operators';
/* NgRx */
import { Action } from '@ngrx/store';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { InventoryService } from '../../services/inventory.service';
import * as inventoryAction from './inventory.actions'

@Injectable()
export class InventoryEffects {
    constructor(private inventoryService: InventoryService, private actions$: Actions) {}

    loadAllInventory$ = createEffect(() =>
      this.actions$.pipe(
        ofType(inventoryAction.InventoryActionTypes.LoadAllInventory),
        mergeMap(() =>
          this.inventoryService.getAllInventory().pipe(
            map(result => new inventoryAction.LoadAllInventorySuccess(result)),
            catchError(err => of(new inventoryAction.LoadAllInventoryFail(err)))
          )
        )
      )
    );

    
    // addNewInventory$ = createEffect(() =>
    //   this.actions$.pipe(
    //     ofType(inventoryAction.InventoryActionTypes.AddNewInventory),
    //     map((action: inventoryAction.AddNewInventory) => action.payload),
    //     mergeMap((newItem) =>
    //       this.inventoryService.addNewInventory(newItem).pipe(
    //         map(result => new inventoryAction.AddNewInventorySuccess(result)),
    //         catchError(err => of(new inventoryAction.AddNewInventoryFail(err)))
    //       )
    //     )
    //   )
    // );

    // acceptInventory$ = createEffect(() =>
    //   this.actions$.pipe(
    //     ofType(inventoryAction.InventoryActionTypes.AcceptInventory),
    //     map((action: inventoryAction.AcceptInventory) => action.payload),
    //     mergeMap((newItem) =>
    //       this.inventoryService.acceptInventory(newItem).pipe(
    //         map(result => new inventoryAction.AcceptInventorySuccess(result)),
    //         catchError(err => of(new inventoryAction.AcceptInventoryFail(err)))
    //       )
    //     )
    //   )
    // );

    // deleteInventory$ = createEffect(() =>
    //   this.actions$.pipe(
    //     ofType(inventoryAction.InventoryActionTypes.DeleteInventory),
    //     map((action: inventoryAction.DeleteInventory) => action.payload),
    //     mergeMap((newItem) =>
    //       this.inventoryService.deleteInventory(newItem).pipe(
    //         map(result => new inventoryAction.DeleteInventorySuccess(result)),
    //         catchError(err => of(new inventoryAction.DeleteInventoryFail(err)))
    //       )
    //     )
    //   )
    // );

    // cancelInventory$ = createEffect(() =>
    //   this.actions$.pipe(
    //     ofType(inventoryAction.InventoryActionTypes.CancelInventory),
    //     map((action: inventoryAction.CancelInventory) => action.payload),
    //     mergeMap((newItem) =>
    //       this.inventoryService.cancelInventory(newItem).pipe(
    //         map(result => new inventoryAction.CancelInventorySuccess(result)),
    //         catchError(err => of(new inventoryAction.CancelInventoryFail(err)))
    //       )
    //     )
    //   )
    // );

    // getByIdInventory$ = createEffect(() =>
    //   this.actions$.pipe(
    //     ofType(inventoryAction.InventoryActionTypes.GetByIdInventory),
    //     map((action: inventoryAction.GetByIdInventory) => action.payload),
    //     mergeMap((newItem) =>
    //       this.inventoryService.getByIdInventory(newItem).pipe(
    //         map(result => new inventoryAction.GetByIdInventorySuccess(result)),
    //         catchError(err => of(new inventoryAction.GetByIdInventoryFail(err)))
    //       )
    //     )
    //   )
    // );

    // updateInventory$ = createEffect(() =>
    //   this.actions$.pipe(
    //     ofType(inventoryAction.InventoryActionTypes.UpdateInventory),
    //     map((action: inventoryAction.UpdateInventory) => action.payload),
    //     mergeMap((newItem) =>
    //       this.inventoryService.updateInventory(newItem).pipe(
    //         map(result => new inventoryAction.UpdateInventorySuccess(result)),
    //         catchError(err => of(new inventoryAction.UpdateInventoryFail(err)))
    //       )
    //     )
    //   )
    // );

    
    // updateInventory$ = createEffect(() =>
    //   this.actions$.pipe(
    //     ofType(inventoryAction.InventoryActionTypes.UpdateInventory),
    //     map((action: inventoryAction.UpdateInventory) => action.payload),
    //     mergeMap((newItem) =>
    //       this.inventoryService.updateItem(newItem).pipe(
    //         map(result => new inventoryAction.UpdateInventorySuccess(result)),
    //         catchError(err => of(new inventoryAction.UpdateInventoryFail(err)))
    //       )
    //     )
    //   )
    // );
    

    
    // deleteInventory$ = createEffect(() =>
    //   this.actions$.pipe(
    //     ofType(inventoryAction.InventoryActionTypes.DeleteInventory),
    //     map((action: inventoryAction.DeleteInventory) => action.payload),
    //     mergeMap((newItem) =>
    //       this.inventoryService.deleteItem(newItem).pipe(
    //         map(result => new inventoryAction.DeleteInventorySuccess(result)),
    //         catchError(err => of(new inventoryAction.DeleteInventoryFail(err)))
    //       )
    //     )
    //   )
    // );
}
