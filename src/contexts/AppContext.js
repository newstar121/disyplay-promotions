import { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from "react";
import axios from 'axios';
import { API_URL } from "../utils/constant";
import React from "react"

const UPDATE_PROMOTIONS = 'UPDATE_PROMOTIONS'

function reducer(state, { type, payload }) {

    switch (type) {

        case UPDATE_PROMOTIONS: {
            const { promotions } = payload
            return {
                ...state,
                promotions,
            }
        }

        default: {
            throw Error(`Unexpected action type in GlobalContext reducer: '${type}'.`)
        }
    }
}

export const GlobalContext = createContext();
export const useGlobalData = () => useContext(GlobalContext);

/**
 * Get promotions from endpoints
 * @param {number} page
 * @param {number} pageSize
 * @param {number} limit
 * 
 * Result param
 * @param {string} id
 * @param {string} name
 * @param {string} description
 * @param {string} heroImageUrl
 * @param {bool}   onlyNewCustomers
 * @param {string} termsAndConditionsButtonText
 * @param {string} joinNowButtonText
 * @param {number} sequence
 * 
 * @returns {Array}
 */
export const getPromotions = async () => {

    try {

        let response = await axios.get(
            API_URL + '484016a8-3cdb-44ad-97db-3e5d20d84298',
            {
                params: {

                }
            });

        return response.data || []

    } catch (error) {

        console.log('getPromotions error', error)
        return []

    }

}

const GlobalProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, {})

    const updatePromotions = useCallback((data) => {

        dispatch({
            type: UPDATE_PROMOTIONS,
            payload: {
                promotions: data,
            },
        })

    }, [])

    // useEffect(() => {

    //     getPromotions().then((promotions) => {

    //         updatePromotions(promotions)

    //     });

    // }, [])

    return (
        <GlobalContext.Provider

            value={useMemo(

                () => [
                    state,
                    {
                        updatePromotions
                    }
                ],
                [
                    state,
                    {
                        updatePromotions
                    }
                ]
            )}

        >

            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalProvider;
