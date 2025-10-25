import React, { useState } from 'react'
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { SvgElements } from '@/components/common'
import { colors, getFontSize, hp, spacing } from '@/styles'
import { SearchIcon, CloseIcon } from '@/assets/svg'
import commonStyles from '@/styles/commonStyles'
import { SearchHeaderProps } from '../types'
import { isIOS } from '@/utils/helper'

const SearchHeader: React.FC<SearchHeaderProps> = ({ onSearch, onSubmitEditing }) => {
    const [searchText, setSearchText] = useState('')

    const clearSearch = () => {
        setSearchText('')
        onSearch?.('')
    }

    const handleTextChange = (text: string) => {
        setSearchText(text)
        onSearch?.(text.trim())
    }

    const handleSearch = () => {
        if (searchText.trim()) {
            onSubmitEditing?.(searchText.trim())
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <View style={styles.searchBar}>
                    <SvgElements
                        name={SearchIcon}
                        width={20}
                        height={20}
                        color={colors.darkGray}
                    />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="TV shows, movies and more"
                        placeholderTextColor={colors.darkGray}
                        value={searchText}
                        onChangeText={handleTextChange}
                        onSubmitEditing={handleSearch}
                        returnKeyType="search"
                    />
                    {searchText?.length > 0 && (
                        <TouchableOpacity onPress={clearSearch}>
                            <SvgElements
                                name={CloseIcon}
                                width={20}
                                height={20}
                                color={colors.darkGray}
                            />
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </View>
    )
}

export default SearchHeader

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        paddingTop: hp(2),
        borderBottomWidth:1,
        borderBottomColor: colors.lightGray,
    },
    searchContainer: {
        paddingHorizontal: spacing.md,
        paddingBottom: spacing.md,
    },
    searchBar: {
        ...commonStyles.flexRow,
        backgroundColor: colors.background,
        borderRadius: hp(1.2),
        paddingHorizontal: spacing.md,
        paddingVertical:  isIOS ? spacing.md : spacing.sm,
        gap: spacing.sm,
    },
    searchInput: {
        flex: 1,
        fontSize: getFontSize(15),
        color: colors.text,
    }
})