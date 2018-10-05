import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import List from 'antd/lib/list';
import 'antd/lib/list/style';

import SearchInput from '../../common/SearchInput/SearchInput.jsx';
import FriendRow from './FriendRow.jsx';

import { noop } from '../../../clientServices/utils/common';

import friendsStyles from '../styles/friendsStyles.less';

class FriendSearch extends PureComponent {
    static defaultProps = {
        isLodaing: false,
        friendsList: [],
        searchField: '',
        onAddFriend: noop,
        onRemoveFriend: noop,
        onSearchChange: noop
    }

    static propTypes = {
        isLodaing: PropTypes.bool,
        friendsList: PropTypes.array,
        searchField: PropTypes.string,
        onAddFriend: PropTypes.func,
        onRemoveFriend: PropTypes.func,
        onSearchChange: PropTypes.func
    }

    render() {
        const {
            friendsList,
            onAddFriend,
            onRemoveFriend,
            onSearchChange,
            searchField,
            isLodaing
        } = this.props;

        return (
            <div>
                <SearchInput
                    placeholder='Введите имя или никнейм друга'
                    value={searchField}
                    handleSearchChange={onSearchChange}
                    loading={isLodaing}
                />
                <div className={friendsStyles.listContainer}>
                    <List
                        locale={{ emptyText: 'Список пуст' }}
                        dataSource={friendsList}
                        renderItem={item => (
                            <FriendRow
                                actions={item.actions}
                                friend={item}
                                onAddFriend={onAddFriend}
                                onRemoveFriend={onRemoveFriend}
                            />)}
                    />
                </div>

            </div>
        );
    }
}

export default FriendSearch;
