import React from 'react'
import getListingById from '../../actions/getListingById'
import getCurrentUser from '../../actions/getCurrentUser';
import ClientOnly from '../../components/ClientOnly';
import EmptyState from '../../components/EmptyState';
import ListingClient from './ListingClient';
import getReservations from '../../actions/getReservation';

interface IPrams{
    listingId? : string;
}

const ListingPage = async ({params} : {params: IPrams} ) => {
    const listing = await getListingById(params)
    const reservations = await getReservations(params)
    const currentUser = await getCurrentUser()

    if(!listing){
        return (
            <ClientOnly>
                <EmptyState/>
            </ClientOnly>
        )
    }

  return (
    <ClientOnly>
        <ListingClient
            listing={listing}
            reservations={reservations}
            currentUser={currentUser}
        />
    </ClientOnly>
  )
}

export default ListingPage