import Autosuggest from 'react-autosuggest';
import AutosuggestHighlightParse from 'autosuggest-highlight/parse';
import AutosuggestHighlightMatch from 'autosuggest-highlight/match';
import React, { Component } from 'react';

//Will scrape youtube channels for a complete list
// Will remove unused data to make smaller and then minimize file
import channelArray from './sampleChannels';


// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
function escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestions(value) {
    const escapedValue = escapeRegexCharacters(value.trim());
    if (escapedValue === '') {
        return [];
    }
    //Only give suggestions when more than 3 characters typed, makes it faster
    if (escapedValue.length < 1) {
        return [];
    }
    const regex = new RegExp('^' + escapedValue, 'i');

    //return languages.filter(language => regex.test(language.name));
    //this returns smaller array that fulfils condition
    let newObj = [];
    for (let i=0; i< channelArray.length; i++) {
        if (regex.test(channelArray[i].snippet.title)) {
            newObj.push({
                    "name": channelArray[i].snippet.title,
                    "channelId": channelArray[i].id.channelId
                })
        }
    }
    return newObj;
}

function getSuggestionValue(suggestion) {
    return suggestion.name;
}

function renderSuggestion(suggestion, { query }) {
    const matches = AutosuggestHighlightMatch(suggestion.name, query);
    const parts = AutosuggestHighlightParse(suggestion.name, matches);

    return (
        <span>
            {parts.map((part, index) => {
                const className = part.highlight ? 'react-autosuggest__suggestion-match' : null;

                return (
                    <span className={className} key={index}>
                        {part.text}
                    </span>
                );
            })}
        </span>
    );
}

class Search extends Component {
    constructor() {
        super();

        // Autosuggest is a controlled component.
        // This means that you need to provide an input value
        // and an onChange handler that updates this value (see below).
        // Suggestions also need to be provided to the Autosuggest,
        // and they are initially empty because the Autosuggest is closed.
        this.state = {
            value: '',
            suggestions: []
        };
    }

    onChange = (_, { newValue }) => {
        this.setState({
            value: newValue
        });
    };

    // Autosuggest will call this function every time you need to update suggestions.
    // You already implemented this logic above, so just use it.
    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: getSuggestions(value)
        });
    };

    // Autosuggest will call this function every time you need to clear suggestions.
    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    render() {
        const { value, suggestions } = this.state;
        const inputProps = {
            placeholder: 'Type a Channel Name',
            value,
            onChange: this.onChange
        };

        return (
            <Autosuggest
                id={"1"}
                suggestions={suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={inputProps}
            />
        );
    }
}


export default Search;